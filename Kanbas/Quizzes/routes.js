import * as dao from "./dao.js";


export default function QuizRoutes(app) {


app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);
app.post("/api/courses/:cid/quizzes", createQuiz);
app.put("/api/modules/:qid", updateQuiz);
app.delete("/api/modules/:qid", deleteQuiz);
}