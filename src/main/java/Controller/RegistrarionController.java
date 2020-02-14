package Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.*;


@Controller
public class RegistrarionController {

    public RegistrarionController() throws SQLException {
    }

    @GetMapping
    public String login(Model model) {
        return "login";
    }

    @GetMapping("/registration")
    public String registr(Model model) {
        return "registration";
    }

    @GetMapping("/game")
    public String game(Model model) {
        return "game";
    }

    @PostMapping("/loger")
    public ResponseEntity<User> catchPostLog(@RequestBody User user) {
        System.out.println("Prinyal");
        try {
            Connection connection = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/registration", "root", "root");
            // ResultSet rsl = connection.createStatement().executeQuery("SELECT password FROM users WHERE login= ? ;");
            String sql = "SELECT password FROM users WHERE login= ? ;";
            // Assuming there is a global variable for the connection, named con
            PreparedStatement upd = connection.prepareStatement(sql);
            upd.setString(1, user.login); // replace first ? with value for first name
            ResultSet rsl = upd.executeQuery();
            rsl.next();
            System.out.println(rsl.getString("password"));
            if(rsl.getString("password").equals(user.password)){
                return new ResponseEntity<>(new User(user.login, user.password), HttpStatus.OK);
            }
        } catch (SQLException e) {
            System.out.println("Empty");
        }
        System.out.println("User with Login: " + user.login + " and Passsword: " + user.password);
        return new ResponseEntity<>(new User("wrong", "wrong"), HttpStatus.FOUND);
    }

    @PostMapping("/registrator")
    public ResponseEntity<Registrator> catchPostReg(@RequestBody Registrator reg) {
        System.out.println("Prinyal");
        boolean mail = false, log = false;
        try {
            Connection connection = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/registration", "root", "root");
            ResultSet rsl = connection.createStatement().executeQuery("SELECT login FROM users;");
            int i = 0;
            while (rsl.next()) {
                if (rsl.getString("login").equals(reg.login)) {
                    i++;
                }
            }
            if (i == 0) log = true;
            ResultSet rse = connection.createStatement().executeQuery("SELECT email FROM users;");
            i = 0;
            while (rse.next()) {
                if (rse.getString("email").equals(reg.email)) {
                    i++;
                }
            }
            if (i == 0) mail = true;
            if (mail && log) {
                connection.createStatement().executeUpdate("INSERT INTO registration.users (login, password, email)\n" +
                        "    VALUES ('" + reg.login + "', '" + reg.password + "', '" + reg.email + "');");
                return new ResponseEntity<>(new Registrator(reg.email, reg.login, reg.password), HttpStatus.OK);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("User with Login: " + reg.login + " and Passsword: " + reg.password + " and Email: " + reg.email);
        return new ResponseEntity<>(new Registrator("contain", "contain", "contain"), HttpStatus.FOUND);
    }
}
