const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

//create
app.post("/repositories", (request, response) => {
  const{title, url, techs} = request.body;
  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  };
  repositories.push(repository);
  return response.json(repository);
});

//update
app.put("/repositories/:id", (request, response) => {
  const{id} = request.params;
  const{title, url, techs, likes} = request.body;

  const repository =
  {
    id,
    title,
    url,
    techs,
    likes
  };

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if(repositoryIndex < 0)
  {
    return response.status(400).json(repository)
  }

  if(title)
  repositories[repositoryIndex].title = repository.title;
  if(url)
  repositories[repositoryIndex].url = repository.url;
  if(techs)
  repositories[repositoryIndex].techs = repository.techs;
  
  return response.status(200).json(repositories[repositoryIndex])
});

//Delete
app.delete("/repositories/:id", (request, response) => 
{
  const{id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if(repositoryIndex < 0)
  {
    return response.status(400).json({error:'Project not found.'});
  }
  repositories.splice(repositoryIndex,1);
  return response.status(204).send();;
});

//add like
app.post("/repositories/:id/like", (request, response) => 
{
  const{id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
    if(repositoryIndex < 0){
        return response.status(400).json({error:'Project not found.'})
    }
    repositories[repositoryIndex].likes++;
    return response.status(200).json(repositories[repositoryIndex])
});

module.exports = app;
