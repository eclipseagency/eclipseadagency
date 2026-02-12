import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <p className="font-heading text-8xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold">Page Not Found</h1>
        <p className="mt-3 text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" className="mt-8">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
