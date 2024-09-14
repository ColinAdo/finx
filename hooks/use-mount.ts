"use client";

import { useEffect, useState } from "react";

export default function useMount() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, [mount]);

  return mount;
}
