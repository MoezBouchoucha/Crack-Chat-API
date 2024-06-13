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
(()=>{const e="acrobat-icon-added",t="acrobat-listener-added",n="acrobat-native-viewer-prompt";let r,i,o,a=new AbortController;const l="acrobatContentScriptDisconnectStart";let c={nativeViewerPromptVisible:!1,previousFileDetailsElement:null,nativeViewerAttachmentURL:null};const s=(e,t,n)=>{if(e){const i=r?.selectors,o=i&&i[n]&&i[n][t];for(let t=0;t<o?.length;t++){let n=e.querySelector(o[t]);if(n)return n}}return null},m=(e,t,n)=>{if(e){const i=r?.selectors,o=i&&i[n]&&i[n][t];for(let t=0;t<o?.length;t++)if(e?.querySelector(o[t])){const n=e?.querySelectorAll(o[t]);if(n&&n.length>0)return n}}return null},u=()=>s(document,"lightBoxViewerFileDetails","nativeViewer"),d=e=>{try{chrome.runtime.sendMessage({main_op:"analytics",analytics:e})}catch(e){}},h=()=>{const e=document.createElement("img");return e.setAttribute("src",i),e.setAttribute("class","acrobat-icon"),e},p=e=>{e=e.replace("disp=safe","disp=inline");const t=document.createElement("a");t.setAttribute("class","acrobat-attachmentcard-hyperlink"),t.setAttribute("href",e+"&acrobatPromotionSource=GmailAttachmentCard"),t.setAttribute("target","_blank"),t.addEventListener("click",(()=>{d([["DCBrowserExt:Gmail:AttachmentCardPrompt:Clicked"]])}),{signal:a.signal});const n=h(),i=(()=>{const e=document.createElement("div");return e.setAttribute("class","acrobat-attachmentcard-tooltip"),e.innerText=r?.acrobatPromptText,e})();return t.appendChild(n),t.appendChild(i),t},w=t=>{t?.forEach((t=>{const n=t?.closest("a"),i=n?.getAttribute("href");if(i&&i.includes("drive.google.com"))t.setAttribute(e,"Y");else{const o=(e=>{const t=r?.selectors,n=t&&t.messageView&&t.messageView.attachmentCardElement;for(let t=0;t<n?.length;t++){let r=e?.closest(n[t]);if(r)return r}return null})(t),l=s(o,"attachmentCardParentElementForAcrobatIcon","messageView");if(i&&l){const r=p(i);l.appendChild(r),t.setAttribute(e,"Y"),n?.addEventListener("click",(()=>{d([["DCBrowserExt:Gmail:AttachmentCard:Clicked"]]),setTimeout((()=>A(i)),500)}),{signal:a.signal})}}}))},b=e=>{const t=document.createElement("a"),i=h(),o=(()=>{const e=document.createElement("span");return e.setAttribute("class","acrobat-native-viewer-prompt-text"),e.textContent=r?.acrobatPromptText||"Open with Acrobat",e})();return t.setAttribute("class",n),t.setAttribute("href",e+"&acrobatPromotionSource=GmailNativeViewer"),t.setAttribute("target","_blank"),t.appendChild(i),t.appendChild(o),t.addEventListener("click",(()=>d([["DCBrowserExt:Gmail:NativeViewerPrompt:Clicked"]]))),t},g=()=>{const e=m(document,"messageView","messageView");let t=[];if(e&&e.length>0)for(let n=0;n<e.length;n++){const r=e[n],i=m(r,"pdfAttachmentWithoutAcrobatIcon","messageView");i&&i.length>0&&t.push(...i)}return t},v=e=>{if(!c.nativeViewerPromptVisible&&!e)return;const t=document.getElementsByClassName(n);t&&t[0]&&t[0].parentElement.removeChild(t[0]),c.nativeViewerPromptVisible=!1},f=e=>{try{if(c?.nativeViewerPromptVisible)return;const t=b(e),n=s(document,"nativeViewerPromptParentElement","nativeViewer");n&&n?.childNodes?.length>0?(n.insertBefore(t,n.childNodes[0]),c.nativeViewerPromptVisible=!0,c.nativeViewerAttachmentURL=e,c.previousFileDetailsElement=u(),window.innerWidth>1200&&d([["DCBrowserExt:Gmail:NativeViewerPrompt:Shown"]])):v()}catch(e){v()}},A=e=>{u()?f(e):v()},E=t=>{t?.forEach((t=>{const n=((e,t,n)=>{if(e){const i=r?.selectors,o=i&&i[n]&&i[n][t];for(let t=0;t<o?.length;t++){let n=e.closest(o[t]);if(n)return n}}return null})(t,"attachmentDiv","listView");n&&(t.setAttribute(e,"Y"),n.addEventListener("click",(()=>{d(["DCBrowserExt:Gmail:ListViewAttachment:Clicked"]),setTimeout((()=>{u()&&d(["DCBrowserExt:Gmail:NativeViewerLV:Shown"])}),500)}),{signal:a.signal}))}))},V=()=>{const e=(()=>{if(s(document,"threadElement","listView"))return m(document,"pdfAttachmentWithoutAcrobatIcon","listView");return null})();e&&E(e)},C=()=>{(()=>{const e=g();e&&e.length>0&&w(e)})(),V(),(()=>{if(c?.nativeViewerPromptVisible){const e=u();e||(c.previousFileDetailsElement=null,c.nativeViewerAttachmentURL=null,v()),e!==c?.previousFileDetailsElement&&v()}else if(c?.previousFileDetailsElement){const e=u();e&&c?.previousFileDetailsElement===e&&f(c?.nativeViewerAttachmentURL)}})()},P=()=>{chrome.runtime?.id||(o&&o.disconnect(),(()=>{try{a.abort()}catch(e){}})())};window.dispatchEvent(new Event("orphanContentScript")),window.dispatchEvent(new Event(l)),chrome.runtime?.sendMessage({main_op:"gmail-init"},(n=>{(n.enableAttachmentCardPromptInGmail||window.location?.search?.includes("enableAcrobatPromptInGmail"))&&(d([["DCBrowserExt:Gmail:PromotionFeature:Enable"]]),r=n,(()=>{const e=chrome.runtime.getURL("browser/css/fonts/AdobeClean-Regular.otf"),t=new FontFace("AdobeClean-Regular",`url(${e})`);t.load().then((()=>{document.fonts.add(t)}))})(),i=chrome.runtime.getURL("browser/images/acrobat_dc_appicon_128.png"),(()=>{if(document.querySelector(`img[src='${i}']`)){const e=document.querySelectorAll(`img[src='${i}']`);for(let t=0;t<e.length;t++)e[t]?.parentElement?.parentElement.removeChild(e[t]?.parentElement)}if(document.querySelector(`img[${e}]`)){const t=document.querySelectorAll(`img[${e}]`);for(let n=0;n<t.length;n++)t[n]?.removeAttribute(e)}if(document.querySelector(`[${t}]`)){const n=document.querySelectorAll(`[${t}]`);for(let t=0;t<n.length;t++)n[t]?.removeAttribute(e)}v(!0)})(),C(),(()=>{try{const e={childList:!0,subtree:!0};o=new MutationObserver((function(){o.takeRecords(),C()})),o.observe(document.body,e)}catch(e){}})())})),window.addEventListener(l,P,{signal:a.signal})})();