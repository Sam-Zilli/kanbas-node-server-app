import Quiz from './model.js'
import Course from '../Courses/model.js';

export const findQuizzesByCourseId = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    const quizzes = await Quiz.find({ course: course.number });
    return quizzes;

  } catch (err) {
    console.error('Error fetching quizzes:', err);
    throw err;
  }
};

  export const findQuizById = async (id) => {
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        throw new Error('Quiz not found');
      }
      return quiz;
    } catch (err) {
      throw err;
    }
  };

  export const createQuiz = async (quizData, cid) => {
    try {
        console.log("dao.js createQuiz");
        console.log(cid); // Ensure cid is logged to verify it's received

        // Get the course that the quiz should belong to
        const course = await Course.findById(cid);
        console.log("Course: ", course);

        // If there's no course
        if (!course) {
            throw new Error('Course not found');
        }

        const courseNumber = course.number;
        quizData.course = courseNumber; 
        console.log("Course Number: ", courseNumber)
        const newQuiz = new Quiz(quizData);
        return await newQuiz.save();
    } catch (err) {
        console.error('Error creating quiz:', err);
        throw err;
    }
};
  
// Function to update a quiz and recalculate numberOfQuestions
export const updateQuiz = async (qid, quizData) => {
  try {
    // Fetch the current quiz document
    const quiz = await Quiz.findById(qid);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Update fields
    Object.assign(quiz, quizData);

    // Recalculate numberOfQuestions and points
    quiz.numberOfQuestions = quiz.questions.length;
    quiz.points = quiz.questions.reduce((total, question) => total + (question.points || 0), 0);

    // Save the updated quiz document
    const updatedQuiz = await quiz.save();
    
    return updatedQuiz;
  } catch (err) {
    console.error('Error updating quiz by ID:', err);
    throw err;
  }
};
  export const deleteQuizById = async (id) => {
    try {
      const deletedQuiz = await Quiz.findByIdAndDelete(id);
      if (!deletedQuiz) {
        throw new Error('Quiz not found');
      }
      return deletedQuiz;
    } catch (err) {
      throw err;
    }
  };


  export const getQuiz = async (cid, qid) => {
    // console.log("dao.js getQuiz")
    try {
        const quiz = await Quiz.findOne({ _id: qid});
        // console.log("Quiz: ", quiz)
        return quiz;
    } catch (err) {
        throw new Error('Error fetching quiz: ' + err.message);
    }
};