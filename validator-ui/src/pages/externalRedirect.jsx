import React from "react";

export default function ExternalRedirect({ to }) {
  React.useEffect(() => {
    window.location.href = to;
  });
  return null;
}
