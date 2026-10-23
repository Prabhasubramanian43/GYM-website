const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "Unable to connect to FitFuel server.");
  return data;
}

export async function syncOriginalMenu(foods) {
  return apiRequest("/products/sync", {
    method: "POST",
    body: JSON.stringify({
      products: foods.map((food) => ({
        ...food,
        imageName:
          typeof food.image === "string" ? food.image.split("/").pop() : "",
      })),
    }),
  });
}

export async function getServerFoods(foods) {
  try {
    await syncOriginalMenu(foods);
    const serverFoods = await apiRequest("/products");
    const byId = new Map(
      serverFoods.map((food) => [Number(food.frontendId), food]),
    );
    return foods.map((original) => {
      const saved = byId.get(Number(original.id));
      return saved
        ? {
            ...original,
            ...saved,
            id: Number(saved.frontendId),
            image: original.image,
            _id: saved._id,
          }
        : original;
    });
  } catch (error) {
    console.warn(
      "FitFuel backend is not connected; showing original frontend menu.",
      error.message,
    );
    return foods;
  }
}

export function getSessionId() {
  let id = localStorage.getItem("fitfuelSessionId");
  if (!id) {
    id = `ff-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("fitfuelSessionId", id);
  }
  return id;
}
