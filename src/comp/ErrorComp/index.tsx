interface ErrorCompProps {
  errorMessage: string;
}

function ErrorComp({ errorMessage }: ErrorCompProps) {
  return (
    <div className="p-4 bg-red-100 text-red-800 border border-red-400 rounded">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p>
        Sorry, something went wrong while loading the content. {errorMessage}
      </p>
    </div>
  );
}

export default ErrorComp;
