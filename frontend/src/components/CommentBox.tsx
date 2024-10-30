
import React from 'react';

const CommentBox = ({ placeholder = "Add your comments here..." }) => (
    <textarea
        className="border border-gray-300 rounded-md p-2 mt-2"
        placeholder={placeholder}
        rows={3}
        cols={80}
    />
);

export default CommentBox;
