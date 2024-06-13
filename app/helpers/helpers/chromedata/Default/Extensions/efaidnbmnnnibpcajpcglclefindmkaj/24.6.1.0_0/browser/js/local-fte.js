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
import{dcLocalStorage as e}from"../../common/local-storage.js";import{analytics as t,events as o}from"../../common/analytics.js";import{LOCAL_FILE_PERMISSION_URL as n,TWO_WEEKS_IN_MS as a}from"../../common/constant.js";import{util as l}from"../js/content-util.js";await e.init();const{id:c,url:i}=await chrome.tabs.getCurrent();t.event(o.LOCAL_FTE_DISPLAYED),e.setWithTTL("localFteCooldown",!0,a);const s=(e.getItem("localFteCount")||0)+1;e.setItem("localFteCount",s),$(document).ready((()=>{l.translateElements(".translate");let a=chrome.i18n.getMessage("@@ui_locale");$("#local-file-animated-fte").css("background-image",`url(../images/LocalizedFte/${a}/fte.svg),url(../images/LocalizedFte/en_US/fte.svg)`),$("#closeLocalFte").click((()=>{l.sendAnalytics(o.LOCAL_FTE_CROSS_BUTTON_CLICKED),chrome.runtime.sendMessage({main_op:"closeLocalFte"})})),$("#continueLocalFte").click((async()=>{t.event(o.LOCAL_FTE_GO_TO_SETTINGS_CLICKED),e.setItem("pdfViewer","true");const a=e.getItem("localFteWindow"),{id:l,height:c,width:i,left:s,top:m}=a;chrome.windows.remove(l),chrome.windows.create({height:c,width:1.2*i,left:s,top:m,focused:!0,type:"popup",url:n},(t=>{e.setItem("settingsWindow",t)}))})),$("#localFteDontShowAgainInput").click((()=>{document.getElementById("localFteDontShowAgainInput").checked?(t.event(o.LOCAL_FTE_DONT_ASK_CHECKED),e.setItem("localFteDontShowAgain",!0)):(t.event(o.LOCAL_FTE_DONT_ASK_UNCHECKED),e.removeItem("localFteDontShowAgain"))})),s>4&&$("#localFteDontShowAgainInput,#localFteDontShowAgainText").removeAttr("hidden"),window.onbeforeunload=()=>{l.sendAnalytics(o.LOCAL_FTE_WINDOW_CLOSED);const e=Date.now();for(;Date.now()-e<60;);},document.addEventListener("keydown",(e=>{"F11"==e.key&&e.preventDefault()}))}));