import handler from "../../../configs/Cloudinary.js"; 
export const dynamic = "force-dynamic";

export async function GET() {
  const mockReq = {};
  const mockRes = {
    status: (code) => ({
      json: (data) =>
        new Response(JSON.stringify(data), {
          status: code,
          headers: { "Content-Type": "application/json" },
        }),
    }),
  };

  return handler(mockReq, mockRes);
}
