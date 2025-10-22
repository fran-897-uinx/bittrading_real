"use client";

import { useEffect } from "react";

export default function SmartsuppScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '6d90b68b1c29038a8405f18bac4574ab4fa81390';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
