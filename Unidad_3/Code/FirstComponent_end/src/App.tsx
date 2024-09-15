import UserProfile from './components/UserProfile';

function App() {
  return (
    <section>
      <UserProfile
        url="https://avatar.iran.liara.run/public/boy"
        name="Dan Abramov"
      />
      <UserProfile
        url="https://avatar.iran.liara.run/public/girl"
        name="Sophie Alpert"
      />
    </section>
  );
}

export default App;
