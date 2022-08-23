const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => s + p.exercises, 0);
  return <p><strong>total of {sum} exercises</strong></p>;
};

const Part = ({ part }) => <p>
  {part.name} {part.exercises}
</p>;

const Content = ({ parts }) => <div>
  {parts.map(part => <Part key={part.id} part={part} />)}
</div>;

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
