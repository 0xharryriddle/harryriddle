import fs from "fs";
import path from "path";

export type TutorialDifficulty = "beginner" | "intermediate" | "advanced";
export type TutorialStatus = "published" | "in-progress" | "coming-soon";

export type TutorialMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  difficulty: TutorialDifficulty;
  duration: string;
  tags: string[];
  status: TutorialStatus;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error("Invalid frontmatter");
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Record<string, string | string[]> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    const trimmedKey = key.trim();

    if (trimmedKey === "tags") {
      metadata[trimmedKey] = value
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^['"]|['"]$/g, ""));
    } else {
      metadata[trimmedKey] = value;
    }
  });

  return { metadata: metadata as TutorialMetadata, content };
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getTutorials() {
  return getMDXData(path.join(process.cwd(), "content", "tutorials"));
}
