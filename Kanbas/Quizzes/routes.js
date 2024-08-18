import * as dao from "./dao.js";


export default function QuizRoutes(app) {

    const findQuizzesByCourseId = async (req, res) => {
        const { cid } = req.params;
        try {
            const quizzes = await dao.findQuizzesByCourseId(cid);
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const quizData = req.body;
        try {
            const newQuiz = await dao.createQuiz({ ...quizData, course: cid });
            res.status(201).json(newQuiz);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const updateQuiz = async (req, res) => {
        const { cid, qid } = req.params;
        const updatedData = req.body;
        try {
            const updatedQuiz = await dao.updateQuiz(qid, updatedData);
            if (!updatedQuiz) {
                return res.status(404).json({ error: "Quiz not found" });
            }
            res.json(updatedQuiz);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const deleteQuiz = async (req, res) => {
        const { cid, qid } = req.params;
        try {
            // Delete the quiz by ID
            const result = await dao.deleteQuizById(qid);
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Quiz not found" });
            }
            res.status(204).end(); // No content
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // New route to get a specific quiz
    const getQuiz = async (req, res) => {
        // console.log("routes.js getQuiz")
        const { cid, qid } = req.params;
        try {
            const quiz = await dao.getQuiz(cid, qid);
            if (!quiz) {
                return res.status(404).json({ error: "Quiz not found" });
            }
            res.json(quiz);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Define routes
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);
    app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
    app.get("/api/courses/:cid/quizzes/:qid", getQuiz);
}