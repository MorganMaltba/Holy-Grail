# Holy Grail
### A Model 3-Tiered Application!

**Description:** <br>
This project demonstrates a model application that includes and intergated front-end, server and datastore.<br>
1. React front-end interface displays information in each component and allows user to interact with server.
2. Express server communicates and updates information between the interface and the datastore.
3. Dockerized Redis datastore holds the data that tracks how many times each section has been clicked.

**How to Run:** <br>
1. To run locally, download all files into the same directory<br>
2. Install packages by opening a terminal to the project directory and running the command<br> *npm install*
3. Start a Docker container based on the Redis image by running the command<br> *docker run -p 6379:6379 --name some-redis -d redis*
4. Start the server by running the command<br> *node index.js*
5. See it live at localhost:3000!

**Roadmap of future improvements:** <br>
Fix blank values upon initial render...

**License information:** <br>
MIT License
