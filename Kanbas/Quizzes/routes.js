import * as dao from "./dao.js";


export default function QuizRoutes(app) {

    const findQuizzesByCourseId = async (req, res) => {
        console.log("Routes.js")
        const { cid } = req.params;
        console.log(cid)
        try {
          const quizzes = await dao.findQuizzesByCourseId(cid);
          res.json(quizzes);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };

      const createQuiz = async(req, res) => {

      }

      const updateQuiz = async (req, res) => {

      }

    const deleteQuiz = async (req, res) => {

    }

app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);
// app.post("/api/courses/:cid/quizzes", createQuiz);
// app.put("/api/modules/:qid", updateQuiz);
// app.delete("/api/modules/:qid", deleteQuiz);
}