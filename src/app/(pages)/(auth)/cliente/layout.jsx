import NavBar from "./components/NavBar/NavBar";

export default function authlayout({ children }) {
    return (
      <div >
        <NavBar />
        <div>{children}</div>
      </div>
    );
  }