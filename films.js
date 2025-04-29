export const handleFilmRoutes = async (req, res, db) => {
    if (req.url === "/api/films" && req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM films");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(rows));
      return true;
    }
  
    if (req.url.startsWith("/api/films/") && req.method === "GET") {
      const id = req.url.split("/")[3];
      if (id) {
        const [rows] = await db.query("SELECT * FROM films WHERE id = ?", [id]);
        if (rows.length > 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(rows[0]));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Film non trouvé" }));
        }
        return true;
      }
    }
  
    return false;
  };
  
