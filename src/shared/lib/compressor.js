import Compressor from "compressorjs";

async function compress (file, options) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success: (compressed) => {
        resolve(compressed);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

export { compress }

