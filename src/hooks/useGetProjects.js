const useGetProjects = async () => {
  const response = await fetch(
    "https://6630a933c92f351c03daa41f.mockapi.io/api/v1/projects"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default useGetProjects;
