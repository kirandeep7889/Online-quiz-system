const Topic = require("../../models/Topics");

async function  getTopics(req, res)  {
    try {
      const topics = await Topic.find();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports=getTopics;