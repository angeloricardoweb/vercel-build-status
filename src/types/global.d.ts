declare global {
  var mongoose: {
    conn: unknown;
    promise: unknown;
  } | undefined;
}

export {}; 