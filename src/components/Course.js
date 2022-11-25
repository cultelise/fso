import React from "react";
import Heading from "./Heading";
import Part from "./Part";
import Sum from "./Sum";

const Course = ({ course }) => {
  return (
    <div>
      <Heading heading={course.name} />
      {course.parts.map((x) => {
        return <Part key={x.id} name={x.name} number={x.exercises} />;
      })}
      <Sum objectArray={course.parts} />
    </div>
  );
};

export default Course;
