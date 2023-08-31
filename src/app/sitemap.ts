import { prisma } from "-/prisma";

const URL = 'https://santrib.mbss.sch.id';

export default async function sitemap() {
  const siswa = await prisma.siswa.findMany();

  const siswaURL = siswa.map(({ nis }) => {
    return {
      url: `${URL}/siswa/${nis}`,
      lastModified: new Date().toISOString(),
    };
  });

  const routes = ['', '/manage', '/unauthorized', '/siswa'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...siswaURL];
}
