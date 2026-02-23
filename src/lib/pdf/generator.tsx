import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
  renderToBuffer,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFEF7",
    fontFamily: "Roboto",
  },
  coverPage: {
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textPage: {
    padding: 50,
    justifyContent: "center",
  },
  chapterTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#D97706",
    textAlign: "center",
    marginBottom: 30,
  },
  storyText: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#1A1A1A",
    textAlign: "justify",
  },
  illustrationPage: {
    padding: 0,
  },
  illustration: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 10,
    color: "#A8A29E",
  },
  separator: {
    width: 60,
    height: 2,
    backgroundColor: "#F59E0B",
    alignSelf: "center",
    marginVertical: 20,
  },
  teaserPage: {
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  teaserText: {
    fontSize: 18,
    fontWeight: 700,
    color: "#8B5CF6",
    textAlign: "center",
    lineHeight: 2,
    fontStyle: "italic",
  },
  teaserLabel: {
    fontSize: 12,
    color: "#A8A29E",
    textAlign: "center",
    marginBottom: 20,
  },
});

interface BookPage {
  type: "cover" | "text" | "illustration" | "title" | "teaser";
  text?: string;
  title?: string;
  imageBase64?: string;
  imageMimeType?: string;
}

interface BookDocumentProps {
  childName: string;
  bookTitle: string;
  pages: BookPage[];
}

function BookDocument({ childName, bookTitle, pages }: BookDocumentProps) {
  let pageNum = 0;

  return (
    <Document
      title={bookTitle}
      author="AI Книга"
      subject="Персонализированная сказка"
    >
      {pages.map((page, i) => {
        if (page.type === "cover") {
          return (
            <Page key={i} size="A4" style={[styles.page, styles.coverPage]}>
              {page.imageBase64 && (
                <Image
                  src={`data:${page.imageMimeType || "image/png"};base64,${page.imageBase64}`}
                  style={styles.coverImage}
                />
              )}
            </Page>
          );
        }

        if (page.type === "title") {
          pageNum++;
          return (
            <Page key={i} size="A4" style={[styles.page, styles.textPage]}>
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text style={styles.chapterTitle}>{page.title}</Text>
                <View style={styles.separator} />
              </View>
              <Text style={styles.pageNumber}>{pageNum}</Text>
            </Page>
          );
        }

        if (page.type === "text") {
          pageNum++;
          return (
            <Page key={i} size="A4" style={[styles.page, styles.textPage]}>
              <Text style={styles.storyText}>{page.text}</Text>
              <Text style={styles.pageNumber}>{pageNum}</Text>
            </Page>
          );
        }

        if (page.type === "illustration" && page.imageBase64) {
          pageNum++;
          return (
            <Page key={i} size="A4" style={[styles.page, styles.illustrationPage]}>
              <Image
                src={`data:${page.imageMimeType || "image/png"};base64,${page.imageBase64}`}
                style={styles.illustration}
              />
              <Text style={styles.pageNumber}>{pageNum}</Text>
            </Page>
          );
        }

        if (page.type === "teaser") {
          pageNum++;
          return (
            <Page key={i} size="A4" style={[styles.page, styles.teaserPage]}>
              <Text style={styles.teaserLabel}>Продолжение следует...</Text>
              <View style={styles.separator} />
              <Text style={styles.teaserText}>{page.text}</Text>
            </Page>
          );
        }

        return null;
      })}
    </Document>
  );
}

export interface GenerateBookPdfParams {
  childName: string;
  bookTitle: string;
  pages: BookPage[];
}

export async function generateBookPdf(
  params: GenerateBookPdfParams
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <BookDocument
      childName={params.childName}
      bookTitle={params.bookTitle}
      pages={params.pages}
    />
  );
  return Buffer.from(buffer);
}

export type { BookPage };
