# tiki-mono

A scaffolding project for creating micro frontend based web applications.

## Create a mono repository

```
$ pnpx degit dalsgaard/tiki-mono my-mono-repo
$ cd my-mono-repo
$ pnpm install
```

## Create an application

### Configuration

```
$ pnpm tiki application
```

You can also run `$pnpm tiki` and then choose `> application`

#### name

Choose a name for your application

```
? name my-app
```

#### cdn

Choose a CDN for loading JavaScript modules.

```
? cdn
> https://cdn.skypack.dev
```

#### preview port

Choose a preview port for serving your application. The _preview_ is a build version of the application that includes the referenced micro frontends, but still runs on your local machine.

```
? preview port (8310)
```

#### development port

Choose a development port for serving your application. The development version includes mocked versions of the references micro frontends.

```
? development port (8311)
```

#### framework

Choose a web framework

```
? framework
> preact
```

### Install dependencies

```
$ cd applications/my-app
$ pnpm install
```

### Development

```
$ code .
$ pnpm dev
```

This example uses VSCode, but any TypeScript capable editor will do.

### Preview

#### Build

```
$ pnpm preview:build
```

#### Serve

```
$ pnpm preview:serve
```

## Create an micro frontend

### Configuration

```
$ pnpm tiki micro-frontend
```

You can also run `$pnpm tiki` and then choose `> micro-frontend`

#### name

Choose a name for your micro frontend

```
? name my-micro-frontend
```

#### cdn

Choose a CDN for loading JavaScript modules.

```
? cdn
> https://cdn.skypack.dev
```

#### preview port

Choose a preview port for serving your micro frontend. The _preview_ is a build version of the micro frontend that can be used when previewing applications.

```
? preview port (8310)
```

#### development port

Choose a development port for serving your micro frontend.

```
? development port (8311)
```

#### framework

Choose a web framework

```
? framework
> preact
```

### Install dependencies

```
$ cd micro-frontends/my-app
$ pnpm install
```

### Development

```
$ code .
$ pnpm dev
```

This example uses VSCode, but any TypeScript capable editor will do.

### Preview

#### Build

```
$ pnpm preview:build
```

#### Serve

```
$ pnpm preview:serve
```
