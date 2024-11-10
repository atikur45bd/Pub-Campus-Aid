
// this is question bank page

import React, { useState, useEffect } from 'react';
import questionData from './QuestionBank.json'; 

const QuestionBank = () => {
    const [data, setData] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');

    useEffect(() => {
        // Load the JSON data into state
        setData(questionData.batches);
    }, []);

    // Extract unique semesters from data
    const getUniqueSemesters = () => {
        const semesters = data.reduce((acc, batch) => {
            if (!acc.includes(batch.semester)) {
                acc.push(batch.semester);
            }
            return acc;
        }, []);
        return semesters;
    };

    // Filter data based on selected semester
    const filterBySemester = (semester) => {
        return semester ? data.filter((batch) => batch.semester === semester) : data;
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    return (
        <div className='px-8'>

            {/* Semester Filter */}
            <div className='text-2xl'>
                <label htmlFor="semester-select">Select Semester: </label>
                <select
                    id="semester-select"
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                >
                    <option value="">All Semesters</option>
                    {getUniqueSemesters().map((semester) => (
                        <option key={semester} value={semester}>
                            {semester}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display filtered data */}
            <div >
                {filterBySemester(selectedSemester).map((batch) => (
                    <div key={batch.batch} className='border mt-5'>
                        <div className='flex justify-center items-center w-full bg-white rounded-lg my-5'>
                            <div className=' text-2xl flex mb-5 text-sky-600 '>
                                <h3 className='text-2xl ' > {batch.batch} - </h3>
                                <h4> {batch.semester}</h4>

                            </div>

                        </div>

                        <div className='grid lg:grid-cols-3 gap-5 '>
                            {batch.subjects.map((subject) => (


                                <div key={subject.subject_name} className='overflow-hidden'>
                                    <div className=' flex justify-center'>
                                    <div className='flex  flex-col  justify-center'>
                                        <h5>Subject: {subject.subject_name}</h5>
                                        <h6 className='text-center'>Exam Type: {subject.exam.type}</h6>
                                    </div>

                                    </div>
                                
                                    

                                    <ul >
                                        {subject.exam.questions.map((question) => (
                                            <li key={question.question_id} className=''>
                                                <img
                                                    className='rounded-md mb-10 mb-5'
                                                    src={question.image_url}
                                                    alt={`Question ${question.question_id}`}
                                                    style={{ maxWidth: '500px' }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionBank;
