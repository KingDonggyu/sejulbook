type Id = number;
type Name = string;
type Introduce = string;

export interface User {
  id: Id;
  name: Name;
  introduce: Introduce;
}

export interface Profile {
  name: Name;
  introduce: Introduce;
}
