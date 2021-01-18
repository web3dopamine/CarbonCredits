package main

import (
	"bufio"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"database/sql"

	_ "github.com/lib/pq"

	"github.com/gorilla/mux"
	"github.com/tarm/serial"
)

//Carbon is...
type Carbon struct {
	carbonEmission string `json:"carbon_emission,omitempty"`
}

var emitted []Carbon

var tpl *template.Template

func init() {

	tpl = template.Must(template.New("main").ParseGlob("*.html"))
}

func database(w http.ResponseWriter, r *http.Request) {

	var (
		rate       int
		created_on string
	)

	// value := val
	//Variables required for setup
	/*
		user= (using default user for postgres database)
		dbname= (using default database that comes with postgres)
		password = (password used during initial setup)
		host = (IP Address of server)
		sslmode = (must be set to disabled unless using SSL. This is not covered during tutorial)
	*/

	//DO NOT SAVE PASSWORD AS TEXT IN A PRODUCTION ENVIRONMENT. TRY USING AN ENVIRONMENT VARIABLE
	connStr := "user=postgres dbname=carbon password= host=127.0.0.1 sslmode=disable"
	//driver name part of "github.com/lib/pq"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		fmt.Print(err)
	} else {
		fmt.Println("database connected")
	}

	rows, err := db.Query("SELECT rate, created_on FROM ratings;")
	if err != nil {
		log.Fatal(err)
	}

	type details struct {
		Rate       int
		Created_on string
	}

	type d []details

	var dList d
	for rows.Next() {

		if err := rows.Scan(&rate, &created_on); err != nil {
			log.Fatal(err)
		}

		dList = append(dList, details{rate, created_on})

	}

	fmt.Println(dList)

	w.Header().Set("Content-Type", "text/html")
	tpl.ExecuteTemplate(w, "rate.html", dList)

	// fmt.Println(rate)

	// currentTime := time.Now()
	// clock := currentTime.Format("2006.01.02 15:04:05")

	// 	defer rows.Close()
	// for rows.Next() {

	//     if err := rows.Scan(&title); err != nil {
	//             log.Fatal(err)
	//     }
	//     fmt.Println(title)
	// }
	// if err := rows.Err(); err != nil {
	//     log.Fatal(err)
	// }

	// sql to carbon measure ratings information
	// statement := "INSERT INTO ratings(rate, created_on) VALUES($1, $2)"

	//prepare statement for sql
	// _, err = db.Exec(statement, value, clock)
	// if err != nil {
	// 	panic(err)
	// }
	// defer stmt.Close()
	//call a instant of employee
}

func chart(w http.ResponseWriter, r *http.Request) {

	var (
		rate       int
		created_on string
	)

	// value := val
	//Variables required for setup
	/*
		user= (using default user for postgres database)
		dbname= (using default database that comes with postgres)
		password = (password used during initial setup)
		host = (IP Address of server)
		sslmode = (must be set to disabled unless using SSL. This is not covered during tutorial)
	*/

	//DO NOT SAVE PASSWORD AS TEXT IN A PRODUCTION ENVIRONMENT. TRY USING AN ENVIRONMENT VARIABLE
	connStr := "user=postgres dbname=carbon password= host=127.0.0.1 sslmode=disable"
	//driver name part of "github.com/lib/pq"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		fmt.Print(err)
	} else {
		fmt.Println("database connected")
	}

	rows, err := db.Query("SELECT rate, created_on FROM ratings;")
	if err != nil {
		log.Fatal(err)
	}

	type details struct {
		Rate       int
		Created_on string
	}

	type d []details

	var dList d
	for rows.Next() {

		if err := rows.Scan(&rate, &created_on); err != nil {
			log.Fatal(err)
		}

		dList = append(dList, details{rate, created_on})

	}

	fmt.Println(dList)

	w.Header().Set("Content-Type", "text/html")
	tpl.ExecuteTemplate(w, "chart.html", dList)

	// fmt.Println(rate)

	// currentTime := time.Now()
	// clock := currentTime.Format("2006.01.02 15:04:05")

	// 	defer rows.Close()
	// for rows.Next() {

	//     if err := rows.Scan(&title); err != nil {
	//             log.Fatal(err)
	//     }
	//     fmt.Println(title)
	// }
	// if err := rows.Err(); err != nil {
	//     log.Fatal(err)
	// }

	// sql to carbon measure ratings information
	// statement := "INSERT INTO ratings(rate, created_on) VALUES($1, $2)"

	//prepare statement for sql
	// _, err = db.Exec(statement, value, clock)
	// if err != nil {
	// 	panic(err)
	// }
	// defer stmt.Close()
	//call a instant of employee
}

func GetCarbonEndPoint(w http.ResponseWriter, req *http.Request) {
	config := &serial.Config{
		Name: "/dev/cu.usbmodem141301",
		Baud: 9600,
		Size: 8,
	}

	stream, err := serial.OpenPort(config)
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(stream)
	fmt.Fprintf(w, "Initializing...")

	for scanner.Scan() {
		// scanner.Text()) // Println will add back the final '\n'
		cVal := scanner.Text()
		// emitted = append(emitted, Carbon{carbonEmission: scanner.Text()})

		fmt.Println(cVal)

		// i, _ := strconv.Atoi(cVal)

		// database(i)
		// fmt.Fprintf(w, emitted)
		// fmt.Printf("%#v\n", emitted)
		// json.NewEncoder(w).Encode(emitted)
	}

	// fmt.Println(123)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	//
}

// func getData() {

// }

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/carbon", GetCarbonEndPoint).Methods("GET")
	router.HandleFunc("/", database).Methods("GET")
	router.HandleFunc("/chart", chart).Methods("GET")

	log.Fatal(http.ListenAndServe(":12345", router))

	fmt.Println("server connected...")
	// http.ListenAndServe(":8080", router)

}
