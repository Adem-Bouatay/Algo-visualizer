import SideBar from "@/components/SideBar";
export default function SortLayout({ children }) {
  return (
    <main className="flex flex-row">
      <SideBar />
      {children}
    </main>
  );
}
