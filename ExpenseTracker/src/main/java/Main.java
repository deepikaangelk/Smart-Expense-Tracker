import static spark.Spark.*;
import com.google.gson.*;
import java.util.*;

public class Main {
    static List<Transaction> transactions = new ArrayList<>();

    public static void main(String[] args) {
        port(4567);
        staticFiles.location("/public");

        post("/add", (req, res) -> {
            Gson gson = new Gson();
            Transaction t = gson.fromJson(req.body(), Transaction.class);
            transactions.add(t);
            return "Added";
        });

        get("/data", (req, res) -> {
            Gson gson = new Gson();
            res.type("application/json");
            return gson.toJson(transactions);
        });
        get("/", (req, res) -> {
            res.redirect("/index.html");
            return null;
        });

        get("/dashboard", (req, res) -> {
            res.redirect("/dashboard.html");
            return null;
        });

        

        post("/delete", (req, res) -> {
            int index = Integer.parseInt(req.body());
            if (index >= 0 && index < transactions.size()) {
                transactions.remove(index);
            }
            return "Deleted";
        });
    }
}
