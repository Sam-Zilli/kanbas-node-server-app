import Quiz from './model.js'
import Course from '../Courses/model.js';

export const findQuizzesByCourseId = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    const quizzes = await Quiz.find({ courseId: course.number });
    
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

  export const createQuiz = async (quizData) => {
    try {
        // Get the course that the quiz shoud belong to
      const course = await Quiz.findById(Data.course);
  
        // If there's no course
      if (!course) {
        throw new Error('Course not found');
      }

      const courseNumber = course.number;
      quizData.course = courseNumber;
      const newQuiz = new Quiz(quizData);
      return await newQuiz.save();
    } catch (err) {
      console.error('Error creating quiz', err);
      throw err;
    }
  };
  
  export const updateQuiz = async (qid, quizData) => {
    try {
      const updatedQuiz= await Quiz.findByIdAndUpdate(qid, quizData, { new: true, runValidators: true });   
      if (!updatedQuiz) {
        throw new Error('Quiz not found');
      }
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