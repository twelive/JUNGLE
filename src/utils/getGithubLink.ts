function getGithubLink(src: string) {
  const linkPath = src.slice(25, -4)
  return `https://github.com/${linkPath}`
}

export default getGithubLink;