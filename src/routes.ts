import AddressDetail from "./routes/AddressDetail.svelte";
import Home from "./routes/Home.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
  "/": Home,
  "/address/:id": AddressDetail,
  "*": NotFound,
};
