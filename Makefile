c:
	docker build -t alexlyakhotskiy/movies .
d:
	docker rmi alexlyakhotskiy/movies
p:
	docker push alexlyakhotskiy/movies


r: 
	docker run --name movies -d -p 3000:3000 --rm -e API_URL=http://localhost:8000/api/v1 alexlyakhotskiy/movies
rd:
	docker run --name movies -d -p 3000:3000 -v 'd:\github_projects\test-task-movies:/app' -v /app/node_modules --rm -e API_URL=http://localhost:8000/api/v1 alexlyakhotskiy/movies
s: 
	docker stop movies


rb:
	docker run --name movies-backend -d -p 8000:8000 --rm webbylabhub/movies
sb:
	docker stop movies-backend