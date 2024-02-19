import NavBar from "./NavBar/NavBar";

export default function authlayout({ children }) {
    return (
      <div >
        <NavBar />
        <div>{children}</div>
      </div>
    );
  }