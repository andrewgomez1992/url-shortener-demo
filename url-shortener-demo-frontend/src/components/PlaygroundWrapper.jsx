// import React, { useState, useEffect } from "react";
// import UrlForm from "./UrlForm";
// import StoreSelector from "./StoreSelector";
// import ShortUrlResult from "./ShortUrlResult";
// import ResolveUrlForm from "./ResolveUrlForm";
// import AliasList from "./AliasList";
// import Logs from "./LogViewer";
// import ApiStatus from "./ApiStatus";
// import { URLShortener } from "@the-node-forge/url-shortener";
// import { FileStore } from "@the-node-forge/url-shortener/stores/fileStore.js";
// import { InMemoryStore } from "@the-node-forge/url-shortener/stores/inMemoryStore.js";

// const backendUrl = "http://localhost:3001";

// const PlaygroundWrapper = () => {
//   const [longUrl, setLongUrl] = useState("");
//   const [alias, setAlias] = useState("");
//   const [expiresIn, setExpiresIn] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [resolvedUrl, setResolvedUrl] = useState("");
//   const [storeType, setStoreType] = useState("inMemory");
//   const [aliasList, setAliasList] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [override, setOverride] = useState(false);
//   const [apiStatus, setApiStatus] = useState(null);

//   const log = (msg) => setLogs((prev) => [msg, ...prev]);

//   const getLocalStore = () => {
//     if (storeType === "file") return new FileStore("url-store.json");
//     return new InMemoryStore();
//   };

//   const refreshAliases = async () => {
//     if (storeType === "api") return;
//     const shortener = new URLShortener("https://sho.rt", getLocalStore());
//     const all = await shortener.store.list();
//     setAliasList(
//       Object.entries(all).map(([alias, entry]) => ({
//         alias,
//         url: entry.url,
//         expiresAt: entry.expiresAt,
//       }))
//     );
//   };

//   const handleShorten = async () => {
//     try {
//       if (storeType === "api") {
//         const res = await fetch(`${backendUrl}/shorten`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: longUrl, alias, expiresIn, override }),
//         });
//         const data = await res.json();
//         setShortUrl(data.shortUrl || "Error");
//         log(`Shortened via API: ${data.shortUrl}`);
//       } else {
//         const shortener = new URLShortener("https://sho.rt", getLocalStore());
//         const url = await shortener.shorten(longUrl, {
//           alias: alias || undefined,
//           expiresIn: expiresIn || undefined,
//           override,
//         });
//         setShortUrl(url);
//         log(`Shortened locally: ${url}`);
//         refreshAliases();
//       }
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//       log(`❌ Error: ${err.message}`);
//     }
//   };

//   const handleResolve = async () => {
//     try {
//       const aliasOnly = alias || shortUrl.split("/").pop();
//       if (!aliasOnly) return alert("❌ Provide an alias to resolve");

//       if (storeType === "api") {
//         const res = await fetch(`${backendUrl}/resolve/${aliasOnly}`);
//         const data = await res.json();
//         setResolvedUrl(data.resolvedUrl || "❌ Not found or expired");
//         log(`Resolved via API: ${aliasOnly} -> ${data.resolvedUrl}`);
//       } else {
//         const shortener = new URLShortener("https://sho.rt", getLocalStore());
//         const result = await shortener.resolve(aliasOnly);
//         setResolvedUrl(result || "❌ Not found or expired");
//         log(`Resolved locally: ${aliasOnly} -> ${result}`);
//       }
//     } catch (err) {
//       alert("❌ Error resolving: " + err.message);
//       log(`❌ Error resolving: ${err.message}`);
//     }
//   };

//   const checkApi = async () => {
//     try {
//       const res = await fetch(`${backendUrl}/`);
//       setApiStatus(res.ok ? "✅ Connected to API" : "❌ API Unreachable");
//     } catch {
//       setApiStatus("❌ API Unreachable");
//     }
//   };

//   useEffect(() => {
//     refreshAliases();
//     if (storeType === "api") checkApi();
//   }, [storeType]);

//   return (
//     <div
//       style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif" }}
//     >
//       <h2>🧪 URL Shortener Playground</h2>

//       <UrlForm
//         longUrl={longUrl}
//         setLongUrl={setLongUrl}
//         alias={alias}
//         setAlias={setAlias}
//         expiresIn={expiresIn}
//         setExpiresIn={setExpiresIn}
//         override={override}
//         setOverride={setOverride}
//         onShorten={handleShorten}
//       />

//       <ShortUrlResult shortUrl={shortUrl} />

//       <ResolveUrlForm
//         alias={alias}
//         shortUrl={shortUrl}
//         onResolve={handleResolve}
//         resolvedUrl={resolvedUrl}
//       />

//       <StoreSelector storeType={storeType} setStoreType={setStoreType} />

//       {storeType === "api" && <ApiStatus status={apiStatus} />}

//       <AliasList aliasList={aliasList} />

//       <Logs logs={logs} setLogs={setLogs} />
//     </div>
//   );
// };

// export default PlaygroundWrapper;
