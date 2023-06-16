const HomePage = () => <div>test</div>;

export const getServerSideProps = async () => {
  console.log(process.env.DATABASE_URL);

  return { props: {} };
};

export default HomePage;
