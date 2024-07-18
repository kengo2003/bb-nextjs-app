import prisma from "@/lib/prismaClient";

export async function DELETE(
  req: Request,
  { params }: { params: { Id: string } }
) {
  const bbId = params.Id;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(bbId),
      },
    });
    console.log("log: delete OK");
  } catch (error) {
    console.error("log: delete error");
  }
}
