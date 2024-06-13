/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{offscreenConfig as e}from"./offscrenUtil.js";let t;const n=new URLSearchParams(window.location.search),a=n.get("env")||"prod",r=n.get("rrv")||"false";function i(t){const n=window.document.getElementById("ajs-worker-iframe"),r=e[a].acrobat_viewer_origin;n&&n.contentWindow.postMessage(t,r)}chrome.runtime.onMessage.addListener((async function(e){if("offscreen"!==e.target)return!1;switch(e.main_op){case"getUserSubscriptions":!function(e){if(!(window.document.getElementsByTagName("iframe")??[]).length&&e.cdnURL){const n=window.document;t=`${e.cdnURL}#/susi/fetchUserSubscription`;const a=n.createElement("iframe");a.setAttribute("src",t);n.getElementById("cdn-dnr-iframe").appendChild(a)}}(e);break;case"generatePageRendition":i({main_op:"generatePageRendition",tabId:e.tabId});break;case"getFileBuffer":const n=await fetch(e.fileBufferBlob),a=await n.blob(),r=await new Response(a).arrayBuffer();i({main_op:"getFileBuffer",tabId:e.tabId,fileInfo:{fileBuffer:r,docLastOpenState:e.docLastOpenState}});break;default:return console.warn(`Unexpected message type received: '${e.main_op}'.`),!1}})),window.addEventListener("message",(function(e){if(e.origin!==new URL(t).origin)return;const n=e.data;"lastUserGuid"===n.type&&(n.main_op="updateSignInStatus",delete n.type);switch(n?.main_op){case"userSubscriptions":case"updateSignInStatus":chrome.runtime.sendMessage({...n,target:"background",tab:{id:""}});break;case"closeOffscreenDocument":chrome.runtime.sendMessage({main_op:"closeOffscreenDocument",target:"background",tab:{id:""}})}})),setTimeout((()=>{"true"===r&&function(){const n=window.document;t=e[a].ajs_worker_uri;const r=n.createElement("iframe");r.setAttribute("src",t),r.setAttribute("id","ajs-worker-iframe"),n.getElementById("cdn-dnr-iframe").appendChild(r)}()}),100);