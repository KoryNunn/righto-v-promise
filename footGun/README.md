This example points out some easy foot-guns with async-await. Hijacking the exception path is the cause of this.

# Example 1: asyncWithoutAwait.js

This example shows what happens if you forget to add
the `await` keyword in just the right spot. This is
*perfectly valid code*, but probably not what you
want.

In this case, most developers would expect rejections
from getPromise to be handled by the try-catch, but
they wont be. If the unhappy-path is rare, you won't
see this mistake unless you write thorough tests.

Even if you *do* write thorough tests, you may not
understand *why* it doesn't work.

# Example 2: asyncAwaitThrow.js

Assume for a moment that we want our language to
be good even without having to use external tools
like type checkers.

This example will only ever respond one way. This is
easier to understand, and easier to find, but it will
take a keen eye and maybe a bit of time in the
debugger to find it.

# Example 3: rightoException.js

This is the righto-version of the spelling mistake
situation above.

In this implementation, the instant you run the code,
you get an exeption telling you what's wrong, and
where in your code the problem exists, down to the
character.

# Example 4: rightoExpectedResult.js

This is the closest thing to the first example, except
that there is no subtle way to accidentally not handle
rejections with righto.

This example works exactly as intended.

# Example 5 - Bonus: rightoIterateException.js

Same as above, but you don't have to learn how callbacks work.