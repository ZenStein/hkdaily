import React from 'react';

const AssignmentCard = ({assignment}) => {
   // console.log(assignment)
    return (
        <div>
            {assignment.cabin} {assignment.status} {assignment.linens}
        </div>
    );
};

export default AssignmentCard;