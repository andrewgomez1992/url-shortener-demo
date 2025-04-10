import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PageContainer,
  Header,
  MainContent,
  LeftColumn,
  RightColumn,
  Footer,
} from "../styles/StyledAppContainer";

import ShortenCard from "./ShortenCard";
import ResolveCard from "./ResolveCard";
import ConnectionStatus from "./ConnectionStatus";
import LogViewer from "./LogViewer";
import StoreSelector from "./StoreSelector";
import AliasListCard from "./AliasListCard";

import { InMemoryStore } from "@the-node-forge/url-shortener/stores/inMemoryStore.js";
import { FileStore } from "@the-node-forge/url-shortener/stores/fileStore.js";
import { URLShortener } from "@the-node-forge/url-shortener";

const API_BASE = import.meta.env.VITE_API_BASE;

const Card = styled.div`
  background: #282a36;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #bd93f9;
  text-align: center;
`;

const sampleUrls = [
  "https://www.example.com/very/long/url?param=something",
  "https://some-really-long-domain.com/product/category/deals/and-more-things",
  "https://another-super-long-url.com/demos/test?param=abc&stuff=xyz",
];

const UrlShortenerDemo = () => {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [override, setOverride] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const [resolvedUrl, setResolvedUrl] = useState("");
  const [aliasList, setAliasList] = useState([]);
  const [expiredAliasList, setExpiredAliasList] = useState([]);
  const [logs, setLogs] = useState([]);
  const [storeType, setStoreType] = useState("redis");
  const [isConnected, setIsConnected] = useState(false);

  // local shortener for memory/file
  const getLocalStore = () => {
    if (storeType === "file") return new FileStore("url-store.json");
    return new InMemoryStore();
  };
  const localShortener = new URLShortener("https://sho.rt", getLocalStore());

  // Logging
  const addLog = (msg) => setLogs((prev) => [msg, ...prev]);

  console.log("expiredAliasList", expiredAliasList);
  console.log("alias", alias);

  // refreshAliasList => calls /list for redis, or local shortener
  const refreshAliasList = async () => {
    if (storeType === "redis") {
      try {
        const res = await fetch(`${API_BASE}/list`);
        if (!res.ok) throw new Error(`Failed to fetch from /list`);
        const data = await res.json();
        console.log("data", data);
        // Map active and expired aliases from Redis, tagging with storeType:
        const activeArr = Object.entries(data.active).map(([alias, entry]) => ({
          alias,
          url: entry.url,
          expiresAt: entry.expiresAt,
          storeType: "redis",
        }));

        const expiredArr = Object.entries(data.expired).map(
          ([alias, entry]) => ({
            alias,
            url: entry.url,
            expiresAt: entry.expiresAt,
            storeType: "redis",
          })
        );

        // Combine active and expired into one list so the card can display both.
        setAliasList([...activeArr, ...expiredArr]);
        setExpiredAliasList(expiredArr); // Optional, if you wish to track expired separately
      } catch (err) {
        console.error("Error fetching from redis /list:", err);
      }
      return;
    }

    // For local memory or file, which returns all entries in one list
    const all = await localShortener.store.list();
    const arr = Object.entries(all).map(([alias, entry]) => ({
      alias,
      url: entry.url,
      expiresAt: entry.expiresAt,
      storeType: storeType, // "inMemory" or "file"
    }));
    setAliasList(arr);
    setExpiredAliasList([]); // Not used in this branch (or you can compute expiration manually)
  };

  // Shorten
  const handleShorten = async () => {
    try {
      if (storeType === "redis") {
        const res = await fetch(`${API_BASE}/shorten`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: longUrl, alias, expiresIn, override }),
        });
        const data = await res.json();
        if (res.ok) {
          setShortUrl(data.shortUrl);
          addLog(`Shortened via Redis: ${longUrl} → ${data.shortUrl}`);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } else {
        console.log("Override value in handleShorten:", override);
        const resultUrl = await localShortener.shorten(longUrl, {
          alias: alias || undefined,
          expiresIn: expiresIn || undefined,
          override,
        });
        setShortUrl(resultUrl);
        addLog(`Shortened locally: ${longUrl} → ${resultUrl}`);
      }

      // Reset fields
      setLongUrl("");
      setAlias("");
      setExpiresIn("");

      // Refresh alias list after successful shorten regardless of store type.
      await refreshAliasList();
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
      addLog(`Error: ${err.message}`);
    }
  };

  // Resolve
  const handleResolve = async (chosenAlias) => {
    try {
      if (storeType === "redis") {
        const res = await fetch(`${API_BASE}/resolve/${chosenAlias}`);
        const data = await res.json();
        if (res.ok) {
          setResolvedUrl(data.resolvedUrl || "❌ Not found or expired");
          addLog(`Resolved via Redis: ${chosenAlias} → ${data.resolvedUrl}`);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } else {
        const result = await localShortener.resolve(chosenAlias);
        setResolvedUrl(result || "❌ Not found or expired");
        addLog(`Resolved locally: ${chosenAlias} → ${result}`);
      }
    } catch (err) {
      alert(`❌ Error resolving: ${err.message}`);
      addLog(`Error: ${err.message}`);
    }
  };

  const handleDeleteAlias = async (aliasToDelete) => {
    try {
      const res = await fetch(`${API_BASE}/delete/${aliasToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        addLog(`🗑️ Deleted alias: ${aliasToDelete}`);
        refreshAliasList(); // Refresh active + expired list
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
    } catch (err) {
      alert(`❌ Error deleting alias: ${err.message}`);
      addLog(`Error deleting alias: ${err.message}`);
    }
  };

  // checkApi => calls /ping to see if backend is up
  const checkApi = async () => {
    try {
      const res = await fetch(`${API_BASE}/ping`);
      setIsConnected(res.ok);
    } catch {
      setIsConnected(false);
    }
  };

  // Switch store => redis => run checkApi + load
  useEffect(() => {
    if (storeType === "redis") {
      checkApi();
      refreshAliasList();
    } else {
      setIsConnected(true);
      refreshAliasList();
    }
  }, [storeType]);

  const handleSampleClick = (url) => {
    setLongUrl(url);
  };

  return (
    <PageContainer>
      <Header>
        <h1>🧪 URL Shortener Playground</h1>
        <h2 style={{ color: "#bd93f9", marginTop: "1rem", fontSize: "1.2rem" }}>
          Sample Long URLs (Click to insert):
        </h2>
        <div style={{ marginTop: "0.5rem" }}>
          {sampleUrls.map((link) => (
            <p
              key={link}
              style={{
                cursor: "pointer",
                color: "#8be9fd",
                margin: 0,
                marginBottom: "0.5rem",
              }}
              onClick={() => handleSampleClick(link)}
            >
              {link}
            </p>
          ))}
        </div>
      </Header>

      <MainContent>
        <LeftColumn>
          <ShortenCard
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            alias={alias}
            setAlias={setAlias}
            expiresIn={expiresIn}
            setExpiresIn={setExpiresIn}
            override={override}
            setOverride={setOverride}
            onShorten={handleShorten}
            shortUrl={shortUrl}
          />
          <Card>
            <Title>Storage & Connection</Title>
            <StoreSelector storeType={storeType} setStoreType={setStoreType} />
            <ConnectionStatus
              activeStore={storeType}
              isConnected={isConnected}
            />
          </Card>
        </LeftColumn>

        <RightColumn>
          {/* Logs */}
          <Card>
            <Title>Logs</Title>
            <LogViewer logs={logs} setLogs={setLogs} />
          </Card>

          {/* Active aliases dropdown in ResolveCard */}
          <ResolveCard
            aliasList={aliasList}
            onResolve={handleResolve}
            resolvedUrl={resolvedUrl}
            setResolvedUrl={setResolvedUrl}
            onDeleteAlias={handleDeleteAlias}
          />

          {/* Expired aliases */}
          <AliasListCard
            title="Current Aliases"
            aliasList={aliasList}
            onDeleteAlias={handleDeleteAlias}
            baseDomain="https://sho.rt"
          />
        </RightColumn>
      </MainContent>

      <Footer>© 2025 The Node Forge • URL Shortener Demo</Footer>
    </PageContainer>
  );
};

export default UrlShortenerDemo;
