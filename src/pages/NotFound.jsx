import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="max-w-xl">
        <EmptyState title="Page not found" description="The page you’re looking for doesn’t exist." actionLabel="Go home" onAction={() => navigate("/")} />
      </div>
    </PageTransition>
  );
}

