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
import LogViewer from "./LogViewer";
import AliasListCard from "./AliasListCard";
import ConnectionStatus from "./ConnectionStatus";

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
  const [isConnected, setIsConnected] = useState(false);

  const addLog = (msg) => setLogs((prev) => [msg, ...prev]);

  const refreshAliasList = async () => {
    try {
      const res = await fetch(`${API_BASE}/list`);
      if (!res.ok) throw new Error(`Failed to fetch from /list`);
      const data = await res.json();

      const activeArr = Object.entries(data.active).map(([alias, entry]) => ({
        alias,
        url: entry.url,
        expiresAt: entry.expiresAt,
      }));

      const expiredArr = Object.entries(data.expired).map(([alias, entry]) => ({
        alias,
        url: entry.url,
        expiresAt: entry.expiresAt,
      }));

      setAliasList(activeArr);
      setExpiredAliasList(expiredArr);
    } catch (err) {
      console.error("Error fetching from redis /list:", err);
    }
  };

  const handleShorten = async () => {
    try {
      const res = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl, alias, expiresIn, override }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
        addLog(`Shortened: ${longUrl} → ${data.shortUrl}`);
      } else {
        throw new Error(data.error || "Unknown error");
      }

      setLongUrl("");
      setAlias("");
      setExpiresIn("");

      await refreshAliasList();
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
      addLog(`Error: ${err.message}`);
    }
  };

  const handleResolve = async (chosenAlias) => {
    try {
      const res = await fetch(`${API_BASE}/resolve/${chosenAlias}`);
      const data = await res.json();
      if (res.ok) {
        setResolvedUrl(data.resolvedUrl || "❌ Not found or expired");
        addLog(`Resolved: ${chosenAlias} → ${data.resolvedUrl}`);
      } else {
        throw new Error(data.error || "Unknown error");
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
        refreshAliasList();
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
    } catch (err) {
      alert(`❌ Error deleting alias: ${err.message}`);
      addLog(`Error deleting alias: ${err.message}`);
    }
  };

  const checkApi = async () => {
    try {
      const res = await fetch(`${API_BASE}/ping`);
      setIsConnected(res.ok);
    } catch {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkApi();
    refreshAliasList();
  }, []);

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
            <ConnectionStatus isConnected={isConnected} />
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <Title>Logs</Title>
            <LogViewer logs={logs} setLogs={setLogs} />
          </Card>

          <ResolveCard
            aliasList={aliasList}
            onResolve={handleResolve}
            resolvedUrl={resolvedUrl}
            setResolvedUrl={setResolvedUrl}
            onDeleteAlias={handleDeleteAlias}
          />

          <AliasListCard
            title="Active Aliases"
            aliasList={aliasList}
            onDeleteAlias={handleDeleteAlias}
            baseDomain="https://sho.rt"
          />

          <AliasListCard
            title="Expired Aliases"
            aliasList={expiredAliasList}
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
