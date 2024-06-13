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
import{OFFSCREEN_DOCUMENT_PATH as e}from"../common/constant.js";import{dcLocalStorage as o}from"../common/local-storage.js";import{common as n}from"./common.js";import{communicate as t}from"./communicate.js";import{Proxy as r}from"./proxy.js";import{util as s}from"./util.js";let c=null;c||(c=new function(){this.proxy=r.proxy.bind(this),this.assignWorkerAndGenerateRendition=async function(t){if(o.getItem("rrv")){const o=n.getEnv(),r=`${e}?env=${o}&rrv=true`;await s.setupOffscreenDocument({path:r,reasons:[chrome.offscreen.Reason.IFRAME_SCRIPTING],justification:"Load iframe in offscreen document"}),chrome.runtime.sendMessage({main_op:"generatePageRendition",target:"offscreen",tabId:t.tabId})}},this.closeOffscreenDocument=function(){chrome.offscreen.closeDocument()}}),t.registerHandlers({generatePageRendition:c.proxy(c.assignWorkerAndGenerateRendition),closeOffscreenDocument:c.proxy(c.closeOffscreenDocument)});export const offscreenActions=c;