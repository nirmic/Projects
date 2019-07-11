
import sqlite3
conn = sqlite3.connect("rio_olympics.db")
cur = conn.cursor()
columns = []

def get_columns():
    cur.execute("PRAGMA table_info(athletes);")
    for row in cur:
        columns.append(row[1])

def print_columns():
    print("The columns in the table are: "+" ".join(col for col in columns))

def athlete_lookup(athlete):
    line = cur.execute('select * from athletes where name is ?;',(athlete,)).fetchone()
    if line == None:
        print("No records found matching {}.".format(athlete))
    else:
        print(str(line))

def add_athlete():
    print_columns()
    athlete = input("Please enter the values you would like to add separated by commas.\n").split(",")
    if len(athlete) < len(columns):
        print("Sorry I cannot add partial records.")
    else:
        cur.execute("INSERT INTO athletes (id,name,nationality,sex,dob,height,weight,sport,gold,silver,bronze) VALUES (?,?,?,?,?,?,?,?,?,?,?);", athlete)

def main():
    answer = ''
    get_columns()
    while True:
        answer = input("\nWhat would you like to do?:\n(1) Look up and athlete\n(2) Add a new athlete\n(3) View column names\n(4) Quit\n")
        if answer == "1":
            answer = input("What athlete would you like to look up? ")
            athlete_lookup(answer)
        elif answer == '2':
            add_athlete()
        elif answer == '3':
            print_columns()
        elif answer == "4":
            break
        else:
            print("Sorry I don't know what you mean.")
    answer = input("Enter '1' to save changes: ")
    if(answer == '1'):
        conn.commit()
        print("Your changes have been saved.")
    else:
        print("The database has not been modified.")
    conn.close()

if __name__ == '__main__':
    main()
