import NavBar from "./NavBar/NAvBar";

export default function authlayout({ children }) {
    return (
      <div >
        <NavBar />
        <div>{children}</div>
      </div>
    );
  }