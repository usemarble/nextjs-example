import Container from "./container";

export default function Footer() {
  return (
    <footer>
      <Container className="py-4 lg:py-8 border-t">
        <div className="flex items-center justify-center">
          <p className="text-sm group text-muted-foreground">
            <span>Powered by </span>
            <a
              href="https://marblecms.com"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-1 group-hover:text-foreground"
            >
              Marble
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
