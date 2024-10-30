
import React from 'react';
import SelectRating from '../modules/SelectRating';

interface RatingQuestionProps {
    label: string;
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({ label }) => (
    <div className="flex flex-col mb-6">
        <label className="text-lg font-semibold text-gray-800">{label}</label>
        <SelectRating />
    </div>
);

export default RatingQuestion;
